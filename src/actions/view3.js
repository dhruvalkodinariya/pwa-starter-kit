export const VIEW3_TEST = 'VIEW3_TEST';

export const updateTest = (userId,name) => {
  return {
    type: VIEW3_TEST,
    userId,
    name
  }
}

window.updateTest = updateTest;