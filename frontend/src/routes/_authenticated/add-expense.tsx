import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';

import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_authenticated/add-expense')({
  component: AddExpense
});

function AddExpense() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: '',
      amount: ''
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({
        json: { ...value }
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      navigate({ to: '/expenses' });
    }
  });

  return (
    <main className="flex flex-col max-w-screen-lg gap-8 mx-auto p-7">
      <h1 className="text-3xl font-bold">Add new expense</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-5"
      >
        <div className="grid items-center w-full max-w-sm gap-3">
          <form.Field
            name="title"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  id={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Groceries from Walmart"
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
              </>
            )}
          />
        </div>
        <div className="grid items-center w-full max-w-sm gap-3">
          <form.Field
            name="amount"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Amout</Label>
                <Input
                  type="number"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="$0.00"
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-[120px] mt-4"
              disabled={!canSubmit}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          )}
        />
      </form>
    </main>
  );
}
