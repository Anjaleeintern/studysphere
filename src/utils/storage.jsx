// // src/utils/storage.js
// export function getCurrentUser() {
//   const u = localStorage.getItem("learnvault_current_user");
//   try {
//     return u ? JSON.parse(u) : null;
//   } catch {
//     return null;
//   }
// }

// export function getUserKey() {
//   const user = getCurrentUser();
//   if (!user) return null;
//   return user.email + "_data";
// }

// export function getUserData() {
//   const key = getUserKey();
//   if (!key) return { categories: [] };
//   return JSON.parse(localStorage.getItem(key) || "{}");
// }

// export function saveUserData(obj) {
//   const key = getUserKey();
//   if (!key) throw new Error("No logged in user");
//   localStorage.setItem(key, JSON.stringify(obj));
// }

// // Ensure categories are stored as objects { name, pages: [] }
// export function normalizeCategories() {
//   const data = getUserData();
//   const cats = (data.categories || []).map((c) =>
//     typeof c === "string" ? { name: c, pages: [] } : { ...c, pages: c.pages || [] }
//   );
//   if (JSON.stringify(cats) !== JSON.stringify(data.categories || [])) {
//     saveUserData({ ...data, categories: cats });
//   }
//   return cats;
// }

// export function listCategories() {
//   normalizeCategories();
//   const data = getUserData();
//   return data.categories || [];
// }

// export function addStudyPageToCategory(categoryName, page) {
//   const data = getUserData();
//   const cats = normalizeCategories();
//   const updated = cats.map((c) => {
//     if (c.name === categoryName) {
//       return { ...c, pages: [...(c.pages || []), page] };
//     }
//     return c;
//   });
//   saveUserData({ ...data, categories: updated });
//   return updated;
// }

// export function getPagesByCategory(categoryName) {
//   const data = getUserData();
//   const cats = normalizeCategories();
//   const found = (cats || []).find((c) => c.name === categoryName);
//   return found ? found.pages || [] : [];
// }

// export function deleteStudyPage(categoryName, pageId) {
//   const data = getUserData();
//   const cats = normalizeCategories();

//   const updated = cats.map((c) => {
//     if (c.name === categoryName) {
//       return { ...c, pages: c.pages.filter((p) => p.id !== pageId) };
//     }
//     return c;
//   });

//   saveUserData({ ...data, categories: updated });
// }

// export function updateStudyPage(categoryName, updatedPage) {
//   const data = getUserData();
//   const cats = normalizeCategories();

//   const updated = cats.map((c) => {
//     if (c.name === categoryName) {
//       return {
//         ...c,
//         pages: c.pages.map((p) =>
//           p.id === updatedPage.id ? updatedPage : p
//         ),
//       };
//     }
//     return c;
//   });

//   saveUserData({ ...data, categories: updated });
// }


// src/utils/storage.js
export function getCurrentUser() {
  const raw = localStorage.getItem("learnvault_current_user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getUserKey() {
  const u = getCurrentUser();
  return u ? u.email + "_data" : null;
}

export function getUserData() {
  const key = getUserKey();
  if (!key) return { categories: [] };
  return JSON.parse(localStorage.getItem(key) || "{}");
}

export function saveUserData(obj) {
  const key = getUserKey();
  if (!key) throw new Error("No logged in user");
  localStorage.setItem(key, JSON.stringify(obj));
}

export function normalizeCategories() {
  const data = getUserData();
  const cats = (data.categories || []).map((c) =>
    typeof c === "string" ? { name: c, pages: [] } : { ...c, pages: c.pages || [] }
  );
  if (JSON.stringify(cats) !== JSON.stringify(data.categories || [])) {
    saveUserData({ ...data, categories: cats });
  }
  return cats;
}

export function listCategories() {
  normalizeCategories();
  const data = getUserData();
  return data.categories || [];
}

export function addCategory(categoryName) {
  const data = getUserData();
  const cats = normalizeCategories();
  if (cats.some((c) => c.name === categoryName)) return cats;
  const updated = [...cats, { name: categoryName, pages: [] }];
  saveUserData({ ...data, categories: updated });
  return updated;
}

export function removeCategory(categoryName) {
  const data = getUserData();
  const cats = normalizeCategories();
  const updated = cats.filter((c) => c.name !== categoryName);
  saveUserData({ ...data, categories: updated });
  return updated;
}

export function addStudyPageToCategory(categoryName, page) {
  const data = getUserData();
  const cats = normalizeCategories();
  const updated = cats.map((c) => {
    if (c.name === categoryName) {
      return { ...c, pages: [...(c.pages || []), page] };
    }
    return c;
  });
  saveUserData({ ...data, categories: updated });
  return updated;
}

export function getPagesByCategory(categoryName) {
  const data = getUserData();
  const cats = normalizeCategories();
  const found = (cats || []).find((c) => c.name === categoryName);
  return found ? found.pages || [] : [];
}

export function deleteStudyPage(categoryName, pageId) {
  const data = getUserData();
  const cats = normalizeCategories();

  const updated = cats.map((c) => {
    if (c.name === categoryName) {
      return { ...c, pages: (c.pages || []).filter((p) => p.id !== pageId) };
    }
    return c;
  });

  saveUserData({ ...data, categories: updated });
  return updated;
}

export function updateStudyPage(categoryName, updatedPage) {
  const data = getUserData();
  const cats = normalizeCategories();

  const updated = cats.map((c) => {
    if (c.name === categoryName) {
      return {
        ...c,
        pages: (c.pages || []).map((p) => (p.id === updatedPage.id ? updatedPage : p)),
      };
    }
    return c;
  });

  saveUserData({ ...data, categories: updated });
  return updated;
}
