# React-Hook-Form Stepform

![rhf-stepform](https://socialify.git.ci/theodorusclarence/rhf-stepform/image?description=1&language=1&owner=1&pattern=Charlie%20Brown&stargazers=1&theme=Dark)

## Code to observe: 

- https://github.com/theodorusclarence/rhf-stepform/tree/main/pages/form, form pages
- https://github.com/theodorusclarence/rhf-stepform/blob/main/store/useFormStore.tsx, where form data is stored
- https://github.com/theodorusclarence/rhf-stepform/blob/main/lib/yup.ts, yup schema
- https://github.com/theodorusclarence/rhf-stepform/blob/main/types.ts, form type declaration
- https://github.com/theodorusclarence/rhf-stepform/tree/main/components/Forms, form components

## Key Points

### Each time submitting, data is stored in FormStore

```tsx
const onSubmit = (data: StepOneData) => {
  setData({ step: 1, data });
  router.push('/form/step-2');
};
```

### The stored data will be used as a default value on revisit

```tsx
const { stepOne, setData } = useFormStore();

const methods = useForm({
  mode: 'onTouched',
  resolver: yupResolver(stepOneSchema),
  defaultValues: stepOne || {},
});
```

### Upload Form

The tricky part lies in Upload Form. The data that is originally stored by the input is `File` object, but if we store it in zustand, it will be transformed into regular object. This will cause an error when we invoke the `URL.createObjectURL(file)` for the FilePreview. 

So we need to invoke it while we get the original File, and store the URL as a new property. In that way, we only invoke it once, and just use the blob url for revisit.

```tsx
const acceptedFilesPreview = acceptedFiles.map(
  (file: FileWithPreview) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
);
```
