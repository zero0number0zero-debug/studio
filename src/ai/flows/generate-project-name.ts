'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a project name based on a description.
 *
 * - generateProjectName - A function that takes a project description and returns a suggested project name.
 * - GenerateProjectNameInput - The input type for the generateProjectName function.
 * - GenerateProjectNameOutput - The return type for the generateProjectName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectNameInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A brief description of the project for which to generate a name.'),
});
export type GenerateProjectNameInput = z.infer<typeof GenerateProjectNameInputSchema>;

const GenerateProjectNameOutputSchema = z.object({
  projectName: z
    .string()
    .describe('A creative and concise project name based on the description.'),
});
export type GenerateProjectNameOutput = z.infer<typeof GenerateProjectNameOutputSchema>;

export async function generateProjectName(
  input: GenerateProjectNameInput
): Promise<GenerateProjectNameOutput> {
  return generateProjectNameFlow(input);
}

const generateProjectNamePrompt = ai.definePrompt({
  name: 'generateProjectNamePrompt',
  input: {schema: GenerateProjectNameInputSchema},
  output: {schema: GenerateProjectNameOutputSchema},
  prompt: `You are an expert in branding.

  Based on the following project description, generate a creative and concise project name.
  The name should be short, memorable, and relevant to the project. Avoid generic names.
  Return only the name.

  Project Description: {{{projectDescription}}}
  `,
});

const generateProjectNameFlow = ai.defineFlow(
  {
    name: 'generateProjectNameFlow',
    inputSchema: GenerateProjectNameInputSchema,
    outputSchema: GenerateProjectNameOutputSchema,
  },
  async input => {
    const {output} = await generateProjectNamePrompt(input);
    return output!;
  }
);
