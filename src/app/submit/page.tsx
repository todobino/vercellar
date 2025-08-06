import { SubmitForm } from '@/components/submit-form';

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Submit Your App
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Share your project with the Vercellar community. Fill out the details below.
        </p>
      </section>
      <SubmitForm />
    </div>
  );
}
