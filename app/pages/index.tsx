import type { NextPage } from 'next';
import { useState } from 'react';
import { Button, CheckBox, Radio, Range, DoubleRange } from '@components/Input';

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
      <Button style="empty">Clique</Button>
      <Button style="rounded">Clique</Button>
      <Button style="white">Clique</Button>
      <CheckBox
        name="Remember me ?"
        value="isRemember"
      />
      <Radio
        name="France"
        value="france"
      />
      <Range
        label="Ton âge"
        min={18}
        max={100}
        stateValue={value}
        setter={setValue}
      />
      <DoubleRange
        label="Durée du film"
        min={18}
        max={100}
        stateValueMin={minValue}
        stateValueMax={maxValue}
        minSetter={setMinValue}
        maxSetter={setMaxValue}
      />
    </main>
  );
};

export default Home;
