export function logoutUser() {
    localStorage.clear()
    localStorage.removeItem("Bearer");
    window.location.href = '/login';
  }