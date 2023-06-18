import { z } from 'zod';

import bacterias from './bacterias.json';

export const keys = [
  'Indol',
  'VM',
  'VP',
  'CITRATO',
  'H2S',
  'Hidrólise de uréia',
  'FEN(LTD)',
  'Lis. Desc.',
  'Ornitina',
  'Mot.(36C)',
  'Malonato',
  'Glic. (Ácido)',
  'Glicose (CO2)',
  'Lactose',
  'Sacarose',
  'Hidrólise de esculina',
  'DNAse(25C)',
  'Pigmento amarelo',
] as const;

export const TestEnum = z.enum(keys);
export const FormSchema = z.object({
  Indol: z.enum(['positive', 'negative']).optional(),
  VM: z.enum(['positive', 'negative']).optional(),
  VP: z.enum(['positive', 'negative']).optional(),
  CITRATO: z.enum(['positive', 'negative']).optional(),
  H2S: z.enum(['positive', 'negative']).optional(),
  'Hidrólise de uréia': z.enum(['positive', 'negative']).optional(),
  'FEN(LTD)': z.enum(['positive', 'negative']).optional(),
  'Lis. Desc.': z.enum(['positive', 'negative']).optional(),
  Ornitina: z.enum(['positive', 'negative']).optional(),
  'Mot.(36C)': z.enum(['positive', 'negative']).optional(),
  Malonato: z.enum(['positive', 'negative']).optional(),
  'Glic. (Ácido)': z.enum(['positive', 'negative']).optional(),
  'Glicose (CO2)': z.enum(['positive', 'negative']).optional(),
  Lactose: z.enum(['positive', 'negative']).optional(),
  Sacarose: z.enum(['positive', 'negative']).optional(),
  'Hidrólise de esculina': z.enum(['positive', 'negative']).optional(),
  'DNAse(25C)': z.enum(['positive', 'negative']).optional(),
  'Pigmento amarelo': z.enum(['positive', 'negative']).optional(),
});
export type FormSchemaType = z.infer<typeof FormSchema>;

const RESULT_TYPES: { [key: string]: string } = {
  positive: '+',
  negative: '-',
  positive_negative: '+/-',
  negative_positive: '-/+',
  depends: 'depende',
};

export const getResultsType = (type: string | null | undefined) => {
  if (!type) return 'não definido';
  return RESULT_TYPES[type];
};

export const getMatchType = (a: string, b: string | undefined) => {
  if (a === b) {
    return 'Exata';
  }
  if (
    (a === 'positive_negative' && b === 'positive') ||
    (a === 'negative_positive' && b === 'negative')
  ) {
    return 'Mais provável';
  }
  if (
    (a === 'negative_positive' && b === 'positive') ||
    (a === 'positive_negative' && b === 'negative')
  ) {
    return 'Menos provável';
  }

  if (a === 'depends') {
    return 'Ignorado';
  }

  return 'Diferente';
};

const computeMatches = (bacteria: (typeof bacterias)[number], formData: FormSchemaType) => {
  let exact = 0;
  let nearly = 0;
  let barely = 0;
  let different = 0;

  const { results } = bacteria;

  Object.keys(formData).forEach((key) => {
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
    if (results[test] === 'depends') {
      return;
    }
    different++;
  });

  const bacteriaWithMetrics = {
    ...bacteria,
    exact,
    nearly,
    barely,
    different,
  };

  return bacteriaWithMetrics;
};

export const getResults = (test: FormSchemaType) => {
  const results = bacterias.map((bacteria) => {
    return computeMatches(bacteria, test);
  });

  results.sort((a, b) => {
    if (a.different !== b.different) {
      return a.different - b.different;
    }
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
