import { useState } from 'react';

import TestForm from '@/components/TestForm';

import Results from './components/Results';
import { FormSchemaType, getResults } from './utils/helpers';

const App = () => {
  const [data, setData] = useState<ReturnType<typeof getResults> | null>(null);

  const computeResults = (data: FormSchemaType) => {
    const results = getResults(data);
    setData(results);
  };

  return (
    <main className='flex h-screen flex-col max-w-[83rem] mx-auto px-4 pt-12 md:pt-10 lg:py-36'>
      <div className='flex flex-col md:flex-row gap-8 md:gap-6'>
        <TestForm computeResults={computeResults} />
        {data && <Results data={data} />}
      </div>
    </main>
  );
};

export default App;
