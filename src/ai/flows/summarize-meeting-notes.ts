'use server';
/**
 * @fileOverview Summarizes meeting notes to extract key discussion points and action items.
 *
 * - summarizeMeetingNotes - A function that takes meeting notes as input and returns a summary.
 * - SummarizeMeetingNotesInput - The input type for the summarizeMeetingNotes function.
 * - SummarizeMeetingNotesOutput - The return type for the summarizeMeetingNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMeetingNotesInputSchema = z.object({
  notes: z.string().describe('The meeting notes to summarize.'),
});
export type SummarizeMeetingNotesInput = z.infer<typeof SummarizeMeetingNotesInputSchema>;

const SummarizeMeetingNotesOutputSchema = z.object({
  summary: z.string().describe('A summary of the key discussion points.'),
  actionItems: z.string().describe('A list of action items identified in the notes.'),
});
export type SummarizeMeetingNotesOutput = z.infer<typeof SummarizeMeetingNotesOutputSchema>;

export async function summarizeMeetingNotes(input: SummarizeMeetingNotesInput): Promise<SummarizeMeetingNotesOutput> {
  return summarizeMeetingNotesFlow(input);
}

const summarizeMeetingNotesPrompt = ai.definePrompt({
  name: 'summarizeMeetingNotesPrompt',
  input: {schema: SummarizeMeetingNotesInputSchema},
  output: {schema: SummarizeMeetingNotesOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing meeting notes.

  Please provide a concise summary of the key discussion points and a clear list of action items.

  Meeting Notes: {{{notes}}}

  Summary:
  Action Items: `,
});

const summarizeMeetingNotesFlow = ai.defineFlow(
  {
    name: 'summarizeMeetingNotesFlow',
    inputSchema: SummarizeMeetingNotesInputSchema,
    outputSchema: SummarizeMeetingNotesOutputSchema,
  },
  async input => {
    const {output} = await summarizeMeetingNotesPrompt(input);
    return output!;
  }
);
