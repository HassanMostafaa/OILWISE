export const HomePage = () => {
  return (
    <div>
      <main>
        <div>
          <h1>
            To get started, edit the <code>page.tsx</code> file.
          </h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app">
              Templates
            </a>{" "}
            or the{" "}
            <a href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app">
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex gap-4 items-start underline">
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy Now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a href="/register" rel="noopener noreferrer">
            Register
          </a>
        </div>
      </main>
    </div>
  );
};
