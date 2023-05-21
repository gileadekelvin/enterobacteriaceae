import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 w-full bg-white border-b border-gray-300'>
      <div className='mx-auto px-4 md:px-16 lg:px-48'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-row gap-2 items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-black
            '
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M9 2H7v2.1c-.71.15-1.27.44-1.68.81L2.7 2.29L1.29 3.71l2.95 2.94C4 7.39 4 8 4 8H2v2h2.04c.06.63.17 1.36.36 2.15l-2.72.9l.63 1.9l2.69-.9c.24.51.5 1.03.82 1.53l-2.38 1.59l1.11 1.66l2.52-1.68c.56.56 1.22 1.06 1.99 1.49l-.96 1.91l1.79.9l1-2l-.16-.09c.95.32 2.03.54 3.27.61V22h2v-2.07c.76-.09 1.81-.29 2.77-.74l1.52 1.52l1.41-1.42l-1.33-1.34c.38-.51.63-1.15.63-1.95c0-.5-.05-.92-.12-1.32l1.57-.78l-.9-1.8l-1.37.69c-.55-.83-1.27-1.29-1.89-1.51l.66-1.96l-1.9-.64l-.76 2.28c-1.33-.13-2.12-.64-2.59-1.19l1.75-.87l-.9-1.8l-1.55.79a4.39 4.39 0 0 0-.72-2.02l1.55-2.32l-1.66-1.11l-1.41 2.12c-.48-.23-1.06-.41-1.76-.5M15 18c-2.94 0-5.19-.82-6.69-2.44C5.68 12.72 6 8.2 6 8.17v-.14C6 7.1 6.39 6 8 6c2.63 0 2.97 1.43 3 2c0 2 1.6 5 6 5c.33 0 2 .15 2 3c0 1.89-3.97 2-4 2M8.5 8A1.5 1.5 0 0 0 7 9.5A1.5 1.5 0 0 0 8.5 11A1.5 1.5 0 0 0 10 9.5A1.5 1.5 0 0 0 8.5 8m2.5 4a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m4.5 2a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5Z'
              />
            </svg>
            <h2 className='text-lg font-medium'>Enterobacteriaceae</h2>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button asChild variant='ghost'>Sobre</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sobre</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-4'>
                  <span>
                    Este site foi desenvolvido pela estudante de farmácia da UEPB
                    <span className='font-bold'> Jéssica Gabriele</span> e pelo engenheiro de
                    software
                    <span className='font-bold'> Gileade Kelvin</span>.
                  </span>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
