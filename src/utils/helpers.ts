import { z } from 'zod';

import bacterias from './bacterias.json';

export const keys = ['Indol', 'VM', 'VP', 'CITRATO'] as const;

const TestEnum = z.enum(keys);
export const FormSchema = z.object({
  Indol: z.enum(['positive', 'negative']).optional(),
  VM: z.enum(['positive', 'negative']).optional(),
  VP: z.enum(['positive', 'negative']).optional(),
  CITRATO: z.enum(['positive', 'negative']).optional(),
});
export type FormSchemaType = z.infer<typeof FormSchema>;

const computeMatches = (bacteria: (typeof bacterias)[number], formData: FormSchemaType) => {
  let exact = 0;
  let nearly = 0;
  let barely = 0;

  const { results } = bacteria;

  Object.keys(results).forEach((key) => {
    const test = TestEnum.parse(key);
    if (results[test] === formData[test]) {
      exact++;
      return;
    }
    if (
      (results[test] === 'positive_negative' && formData[test] === 'positive') ||
      (results[test] === 'negative_positive' && formData[test] === 'negative')
    ) {
      nearly++;
      return;
    }
    if (
      (results[test] === 'negative_positive' && formData[test] === 'positive') ||
      (results[test] === 'positive_negative' && formData[test] === 'negative')
    ) {
      barely++;
      return;
    }
  });

  const bacteriaWithMetrics = {
    ...bacteria,
    exact,
    nearly,
    barely,
  };

  return bacteriaWithMetrics;
};

export const getResults = (test: FormSchemaType) => {
  const results = bacterias.map((bacteria) => {
    return computeMatches(bacteria, test);
  });

  results.sort((a, b) => {
    if (a.exact !== b.exact) {
      return b.exact - a.exact; // Ordena por exact em ordem decrescente
    }
    if (a.nearly !== b.nearly) {
      return b.nearly - a.nearly; // Ordena por nearly em ordem decrescente
    }
    if (a.barely !== b.barely) {
      return b.barely - a.barely; // Ordena por barely em ordem decrescente
    }
    return 0; // Mantém a ordem atual se todos os critérios forem iguais
  });

  return results;
};
