import type { NextPage } from 'next';
import { useState } from 'react';
import {
  Button,
  CheckBox,
  RadioInput,
  RangeInput,
  DoubleRangeInput,
  TextInput,
} from '@components/Input';

const Home: NextPage = () => {
  const [value, setValue] = useState(18);
  const [minValue, setMinValue] = useState(18);
  const [maxValue, setMaxValue] = useState(100);

  return (
    <main className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-orange-primary">
        Bonjour et bienvenue chez Cinévoraces !
      </h1>
      <Button>Clique</Button>
      <Button customStyle="empty">Clique</Button>
      <Button customStyle="rounded">Clique</Button>
      <Button customStyle="white">Clique</Button>
      <CheckBox
        id="remember"
        label="Remember me ?"
        value="isRemember"
      />
      <RadioInput
        label="France"
        id="france"
        value="france"
      />
      <RangeInput
        label="Ton âge"
        id="age"
        min={18}
        max={100}
        value={value}
        setter={setValue}
      />
      <DoubleRangeInput
        label="Durée du film"
        id="length"
        min={18}
        max={100}
        minValue={minValue}
        maxValue={maxValue}
        minSetter={setMinValue}
        maxSetter={setMaxValue}
      />
      <TextInput 
        id='firstName'
        label='Votre prénom'
        placeholder='Votre prénom...' />
    </main>
  );
};

export default Home;
