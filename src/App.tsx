import { useState } from 'react';

import TestForm from '@/components/TestForm';

import Results from './components/Results';
import { FormSchemaType, getResults } from './utils/helpers';

const App = () => {
  const [data, setData] = useState<{
    data: ReturnType<typeof getResults> | null;
    form: FormSchemaType | null;
  }>({
    data: null,
    form: null,
  });

  const computeResults = (dataForm: FormSchemaType) => {
    const results = getResults(dataForm);
    setData({ data: results, form: dataForm });
    const element = document.getElementById('results');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      id='results'
      className='flex h-screen flex-col max-w-[83rem] mx-auto px-4 pt-4 md:pt-6 lg:py-12'
    >
      <div className='flex flex-col md:flex-row gap-8 md:gap-6'>
        <TestForm computeResults={computeResults} />
        {data.data && data.form && <Results data={data} />}
      </div>
    </main>
  );
};

export default App;
