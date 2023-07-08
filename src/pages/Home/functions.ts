export function showError({ ...error }) {
  for (const key in error) {
    alert(`${error[key].message}`)
  }

  return false
}
