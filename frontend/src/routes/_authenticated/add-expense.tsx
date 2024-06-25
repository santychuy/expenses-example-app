import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { api } from '@/lib/api';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { createExpenseSchema } from '@server/validations/expenses';

export const Route = createFileRoute('/_authenticated/add-expense')({
  component: AddExpense
});

function AddExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: '',
      amount: '',
      date: new Date().toISOString()
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({
        json: { ...value }
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      queryClient.invalidateQueries({ queryKey: ['expenses'] });

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
        className="flex max-sm:flex-col items-center justify-center lg:h-[calc(100vh-200px)] gap-10"
      >
        <div className="flex flex-col gap-5 w-full max-w-[340px]">
          <div className="grid items-center gap-3">
            <form.Field
              name="title"
              validators={{
                onChange: createExpenseSchema.shape.title
              }}
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
          <div className="grid items-center gap-3">
            <form.Field
              name="amount"
              validators={{
                onChange: createExpenseSchema.shape.amount
              }}
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
                className="max-sm:self-center w-[120px]"
                disabled={!canSubmit}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            )}
          />
        </div>
        <div>
          <form.Field
            name="date"
            validators={{
              onChange: createExpenseSchema.shape.date
            }}
            children={(field) => (
              <>
                <Calendar
                  mode="single"
                  selected={new Date(field.state.value)}
                  onSelect={(date) =>
                    field.handleChange((date ?? new Date()).toISOString())
                  }
                  className="border rounded-md"
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
              </>
            )}
          />
        </div>
      </form>
    </main>
  );
}
