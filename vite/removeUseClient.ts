// This plugin is used to remove the React "use client" directive for Client Components for use in contexts such as Next.js
export function removeUseClient() {

  const supportedExtensions = /\.(js|ts|jsx|tsx)$/;

  return {
    name: 'remove-use-client',
    transform(code: string, id: string) {
      if (!supportedExtensions.test(id)) return null;
      const newCode = code.replace(/['"]use client['"];/g, '');
      return { code: newCode, map: null };
    }
  };
}