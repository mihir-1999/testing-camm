function degisterServiceWorker() {
  if (!window.navigator || !window.navigator.serviceWorker) {
    return;
  }

  navigator.serviceWorker.getRegistrations().then(function whenRegistrations(regs) {
    // clear all worker caches
    caches.keys().then(function eachKey(cacheKeys) {
      cacheKeys.forEach(function deleteEach(cacheKey) {
        caches.delete(cacheKey);
      });
    });

    // unregister all workers
    regs.forEach(function unregisterEach(reg) {
      reg.unregister();
    });
  });
}

degisterServiceWorker();
