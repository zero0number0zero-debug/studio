// src/ai/flows/generate-project-plan.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a draft project plan based on a project description.
 *
 * - generateProjectPlan - A function that takes a project description and returns a draft project plan.
 * - GenerateProjectPlanInput - The input type for the generateProjectPlan function.
 * - GenerateProjectPlanOutput - The return type for the generateProjectPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectPlanInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A brief description of the project for which to generate a plan.'),
});
export type GenerateProjectPlanInput = z.infer<typeof GenerateProjectPlanInputSchema>;

const GenerateProjectPlanOutputSchema = z.object({
  projectPlan: z
    .string()
    .describe('A draft project plan generated based on the project description.'),
});
export type GenerateProjectPlanOutput = z.infer<typeof GenerateProjectPlanOutputSchema>;

export async function generateProjectPlan(
  input: GenerateProjectPlanInput
): Promise<GenerateProjectPlanOutput> {
  return generateProjectPlanFlow(input);
}

const generateProjectPlanPrompt = ai.definePrompt({
  name: 'generateProjectPlanPrompt',
  input: {schema: GenerateProjectPlanInputSchema},
  output: {schema: GenerateProjectPlanOutputSchema},
  prompt: `You are an expert project manager with PMP certification.

  Based on the following project description, generate a draft project plan.

  Project Description: {{{projectDescription}}}

  The project plan should include the following sections:

  1.  Project Overview
  2.  Project Goals and Objectives
  3.  Project Scope
  4.  Project Deliverables
  5.  Project Timeline
  6.  Project Budget
  7.  Project Risks and Assumptions
  8.  Project Team and Roles
  9.  Project Communication Plan
  10. Project Stakeholders
  `,
});

const generateProjectPlanFlow = ai.defineFlow(
  {
    name: 'generateProjectPlanFlow',
    inputSchema: GenerateProjectPlanInputSchema,
    outputSchema: GenerateProjectPlanOutputSchema,
  },
  async input => {
    const {output} = await generateProjectPlanPrompt(input);
    return output!;
  }
);
