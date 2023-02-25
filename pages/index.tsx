import type { NextPage } from 'next';
import Copy from '../components/Copy';
import InputColor from '../components/InputColor';
import Layout from '../components/Layout';
import { siteConfig } from '../const/site.config';
import App from '../src/App';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="pt-12">
        {/* <h1 className="text-3xl mb-4">{siteConfig.title}</h1> */}
        <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
          {/* Card */}
          <InputColor />
          <br />
          <Copy />
          {/* <App /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
