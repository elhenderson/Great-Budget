export const getFormState = (state, form) => (
  (state && state.form && state.form[form] || {})
)