import Layout from '../components/layout/Layout';
import '../styles/globals.scss';

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
