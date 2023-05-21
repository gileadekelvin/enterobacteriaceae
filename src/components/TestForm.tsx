'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { FormSchema, FormSchemaType, keys } from '../utils/helpers';

type TestFormProps = {
  computeResults: (data: FormSchemaType) => void;
};

const TestForm = (props: TestFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormSchemaType) {
    props.computeResults(data);
  }

  return (
    <div className='flex flex-col justify-start w-[300px] md:w-[600px] gap-2'>
      <h3>Preencha o resultado dos testes bioquímicos:</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          {keys.map((key) => (
            <FormField
              control={form.control}
              name={key}
              key={key}
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormLabel>{key}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-row space-x-4'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='positive' />
                        </FormControl>
                        <FormLabel className='font-normal text-md'>Positivo</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='negative' />
                        </FormControl>
                        <FormLabel className='font-normal text-md'>Negativo</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className='pt-2'>
            <Button type='submit'>Ver resultados</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TestForm;
