import {
  FormSchemaType,
  TestEnum,
  getMatchType,
  getResults,
  getResultsType,
} from '@/utils/helpers';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type ResultsProps = {
  data: {
    data: ReturnType<typeof getResults> | null;
    form: FormSchemaType | null;
  };
};

type BacteriaProps = {
  bacteria: NonNullable<ResultsProps['data']['data']>[number];
  form: FormSchemaType;
};

const Help = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-6 w-6'>
          <path
            fill='currentColor'
            d='M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362Zm.05 4q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm.1-14.3q.625 0 1.088.4t.462 1q0 .55-.337.975t-.763.8q-.575.5-1.012 1.1t-.438 1.35q0 .35.263.588t.612.237q.375 0 .638-.25t.337-.625q.1-.525.45-.938t.75-.787q.575-.55.988-1.2t.412-1.45q0-1.275-1.038-2.087T12.1 6q-.95 0-1.812.4T8.975 7.625q-.175.3-.113.638t.338.512q.35.2.725.125t.625-.425q.275-.375.688-.575t.862-.2Z'
          />
        </svg>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como os resultados são calculados?</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 overflow-auto h-[600px]'>
          <p>
            Os resultados são calculados comparando os dados dos testes bioquímicos os valores de
            referências para as bactérias.
          </p>
          <p>
            Os dados usados para o cálculo têm as seguintes referências:
            Lima, Z. N. 2023 (Microbiologia Clínica)
            Fonte: Koneman, 2018
          </p>
          <p>
            Cada bactéria possui um conjunto de valores de referência e para cada uma delas
            comparamos se esse valor corresponde ao resultado obtido no teste.
          </p>
          <p>Para cada bactéria 3 métricas são calculadas:</p>
          <div>
            <ul className='max-w-md space-y-1 list-disc list-inside'>
              <li>
                Exata: Quando o teste dá{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>+</span> e
                tabela de referência também é{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>+</span> ou
                quando o teste é{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>-</span> e
                tabela de referência é{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>-</span>
              </li>
              <li>
                Mais provável: teste{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>+</span> e
                tabela{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>+/-</span> OU
                teste{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>-</span> e
                tabela{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>-/+</span>
              </li>
              <li>
                Menos provável: teste{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>+</span> e
                tabela{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>-/+</span> OU
                teste{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>-</span>e
                tabela{' '}
                <span className='font-medium bg-gray-100 border border-gray-200 p-0.5'>+/-</span>
              </li>
            </ul>
          </div>
          <p>
            Os resultados estão ordenados por ordem descrescente considerando as métricas Exata,
            Mais provável e Menos provável, nesta mesma ordem de prioridade.
          </p>
          <p>
            Ou seja, bactérias com maior número de combinações exatas irão aparecer no topo da
            lista, caso haja empate entre duas bactérias, o desempate será feito com a métrica Mais
            provável, caso o empate permaneça será com a métrica Menos provável.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Details = (props: BacteriaProps) => {
  const { bacteria, form } = props;
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value={bacteria.name} className='border-none'>
        <AccordionTrigger>Ver detalhes</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teste</TableHead>
                <TableHead>Resultado do Teste</TableHead>
                <TableHead>
                  <span className='italic'>{bacteria.name}</span>
                </TableHead>
                <TableHead>Combinação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(bacteria.results)?.map((result) => {
                const test = TestEnum.parse(result);
                return (
                  <TableRow key={result}>
                    <TableCell className='font-medium'>{result}</TableCell>
                    <TableCell>{getResultsType(form[test])}</TableCell>
                    <TableCell>{getResultsType(bacteria.results[test])}</TableCell>
                    <TableCell>{getMatchType(bacteria.results[test], form[test])}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const Bacteria = (props: BacteriaProps) => {
  const { bacteria, form } = props;
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='italic'>{bacteria.name}</CardTitle>
        <CardDescription>
          <span>{bacteria.subgrupo}</span>
          {bacteria.genero && <span className='italic'> ･ {bacteria.genero}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <div className='flex flex-col'>
          <p>Número de testes com combinação:</p>
          <div className='flex flex-col md:flex-row md:justify-between'>
            <span className='font-medium'>Exata: {bacteria.exact}</span>
            <span className='font-medium'>Mais provável: {bacteria.nearly}</span>
            <span className='font-medium'>Menos provável: {bacteria.barely}</span>
          </div>
        </div>
        <Details bacteria={bacteria} form={form} />
      </CardContent>
    </Card>
  );
};

const Results = (props: ResultsProps) => {
  const { data } = props;

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-row gap-1 items-center'>
        <h2 className='text-2xl font-medium'>Resultados</h2>
        <Help />
      </div>
      <div className='flex flex-col gap-4'>
        {data?.data?.map(
          (bacteria) =>
            data.form && <Bacteria key={bacteria.name} bacteria={bacteria} form={data.form} />,
        )}
      </div>
    </div>
  );
};

export default Results;
