export const storage = {
  local: {
    get: (key: string) => {
      try {
        if (typeof Storage !== "undefined") {
          return JSON.parse(localStorage.getItem(key) ?? "");
        }
        return null;
      } catch {
        console.error(`Could not save on localStorage`);
      }
    },
    set: (key: string, value: any) => {
      if (typeof Storage !== "undefined") {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch {
          console.error(`Could not save on localStorage`);
        }
      }
    },
    remove: (key: string) => {
      if (typeof Storage !== "undefined") {
        try {
          localStorage.removeItem(key);
        } catch {
          console.error(`Could not save on localStorage`);
        }
      }
    },
  },
};
