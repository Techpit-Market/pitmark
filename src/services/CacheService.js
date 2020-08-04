class CacheService {
  getItem(key) {
    const value = localStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  }

  setItem(key, value) {
    if (value != null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, null);
    }
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }
}

const cacheService = new CacheService();
export { cacheService };
