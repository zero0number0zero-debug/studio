'use server';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import {db} from '@/lib/firebase/firestore';
import type { Project } from '@/lib/types';

const PROJECTS_COLLECTION = 'projects';

export async function getProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No projects found in Firestore.');
      return [];
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

    return projects;
  } catch (error) {
    console.error('Error getting projects from Firestore: ', error);
    console.log('Returning empty array as a fallback.');
    return [];
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
            console.log("No such document in Firestore!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}

export const createProject = async (
  name: string,
  description: string
): Promise<string> => {
  const newProjectData = {
    name,
    description,
    status: 'Initiation',
    progress: 0,
    team: [
      { name: 'User', avatarUrl: '' },
      { name: 'AI Assistant', avatarUrl: '' },
    ],
    lastUpdate: 'Just now',
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), newProjectData);
  
  return docRef.id;
};
