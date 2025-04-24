import { FlowersCatalog } from "../components/FlowersCatalog";

import { Layout } from "../components/layout";

function App() {
  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <FlowersCatalog />
      </main>
    </Layout>
  );
}

export default App;
