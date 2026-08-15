let interceptorInstalled = false;

export function setupFetchInterceptor() {
  if (interceptorInstalled || typeof window === "undefined") return;
  interceptorInstalled = true;

  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const res = await originalFetch(...args);

    if (res.status === 401) {
      localStorage.removeItem("userToken");
      window.dispatchEvent(new Event("auth:logout"));

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return res;
  };
}