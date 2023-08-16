import React from 'react';

const FAQ = () => {
  return (
    <div className='animate-rise flex flex-col justify-center items-center text-center'>
      <h1 className='uppercase text-5xl font-bold py-8'>Frequently Asked Questions</h1>
      <div className='flex flex-col w-4/5 gap-6'>
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            What type of payment do you accept?
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            We accept debit, credit, and paypal.
          </p>
        </div>
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            How do I reset my password?
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Lost or forgot your password? Visit this page. It will simply ask for your email address and we will send you a recovery email, so you can 
            create a new password. Don't forget to check your spam folder if you are not seeing it.
          </p>
        </div>
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            How do I cancel my <span className='italic'>On The Grind</span> subscription?
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            We are sad to see you go, but if there's anything we can do to make your experience better, whether that's changing your roast preference, 
            frequency, grind, or anything else, don't hesitate to contact us. Otherwise, you can head to the account section, select the item you wish 
            to cancel, and select the cancellation button within the details of the order. Our policy on cancellation is pretty simple: you need to 
            cancel by 5 PM (PST) on Thursday the week before your next scheduled shipment.
          </p>
        </div>
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            What is inside the subscription boxes?
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            You will be receiving 3 high quality products. Our subscription box contains 1 coffee of the of the month (different every month), 1 random 
            tea leaves, and 1 pack of coffee beans of of your choice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;