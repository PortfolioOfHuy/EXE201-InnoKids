import Header from "./Header";

function HeaderOnly({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-none">
        <Header />
      </header>
      <main className="flex-grow flex justify-center items-center">
        <div>{children}</div>
      </main>
    </div>
  );
}

export default HeaderOnly;
