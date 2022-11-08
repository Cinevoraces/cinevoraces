import type { NextPage } from 'next';
import Button from 'components/Input/Button';
import CheckBox from '@components/Input/CheckBox';
import Radio from '@components/Input/Radio';

const Home: NextPage = () => {
  return (
    <main className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-orange-primary">
        Bonjour et bienvenue chez Cinévoraces !
      </h1>
      <Button>Clique</Button>
      <Button style="empty">Clique</Button>
      <Button style="rounded">Clique</Button>
      <Button style="white">Clique</Button>
      <CheckBox
        name="Remember me ?"
        value="isRemember"
      />
      <Radio name='France' value='france'/>
    </main>
  );
};

export default Home;
