// This is a temporary file to bridge the gap until we have a real backend.
// It will be replaced with a real backend service.
'use server';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {db} from '@/lib/firebase/firestore';
import {MOCK_PROJECTS, type Project} from '@/lib/placeholder-data';
import { revalidatePath } from 'next/cache';

const PROJECTS_COLLECTION = 'projects';

export async function getProjects(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    if (querySnapshot.empty) {
      console.log('No projects found, seeding database...');
      for (const project of MOCK_PROJECTS) {
        // Use a different variable name to avoid shadowing
        const { id, ...projectData } = project;
        await addDoc(collection(db, PROJECTS_COLLECTION), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
      }
      // After seeding, get the data again to have correct IDs
      const seededSnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
      const projects = seededSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          status: data.status,
          progress: data.progress,
          team: data.team,
          lastUpdate: data.lastUpdate || 'N/A',
        } as Project;
      });
       return projects.sort((a,b) => b.createdAt.seconds - a.createdAt.seconds);
    }
    const projects = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        status: data.status,
        progress: data.progress,
        team: data.team,
        lastUpdate: data.lastUpdate || 'N/A',
        createdAt: data.createdAt,
      } as Project;
    });
    return projects.sort((a,b) => b.createdAt.seconds - a.createdAt.seconds);
  } catch (error) {
    console.error('Error getting projects: ', error);
    // Return mock data as a fallback if firestore fails
    return MOCK_PROJECTS;
  }
}


export async function getProjectById(id: string): Promise<Project | null> {
    try {
        const docRef = doc(db, PROJECTS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                name: data.name,
                description: data.description,
                status: data.status,
                progress: data.progress,
                team: data.team,
                lastUpdate: data.lastUpdate || 'N/A',
            } as Project
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        // Fallback to mock data if firestore fails
        const project = MOCK_PROJECTS.find(p => p.id === id);
        return project || null;
    }
}

export const createProject = async (
  name: string,
  description: string
): Promise<Project> => {
  const newProjectData = {
    name,
    description,
    status: 'Initiation',
    progress: 0,
    team: [{name: 'User', avatarUrl: 'https://picsum.photos/seed/user/40/40'}],
    lastUpdate: 'Just now',
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), newProjectData);

  revalidatePath('/dashboard');

  return {
    id: docRef.id,
    ...newProjectData,
  } as Project;
};