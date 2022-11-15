import type { NextPage } from 'next';
import React, { useState } from 'react';
import Layout from '@components/Layout';
import {
  Button,
  CheckBox,
  Toggle,
  RadioInput,
  RangeInput,
  DoubleRangeInput,
  TextInput,
  TextArea,
} from '@components/Input';

const Home: NextPage = () => {
  const defaultChecked = false;
  const [isRequired, setIsRequired] = useState(false);
  const [isRememberChecked, setIsRememberChecked] = useState(defaultChecked);
  const [value, setValue] = useState(18);
  const [minValue, setMinValue] = useState(18);
  const [maxValue, setMaxValue] = useState(100);
  const [isPwVisible, setIsPwVisible] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold text-orange-primary">Bonjour et bienvenue chez Cinévoraces !</h1>
      <Button>Clique</Button>
      <Button customStyle="empty">Clique</Button>
      <Button customStyle="rounded">Clique</Button>
      <Button customStyle="white">Clique</Button>
      {
        <form
          onSubmit={(e) => {
            e.preventDefault();
            !isRequired && setIsRequired(true);
            console.log(e.currentTarget.reportValidity());
          }}
          className="flex flex-col w-full gap-3">
          <CheckBox
            id="remember"
            label="Remember me ?"
            checked={isRememberChecked}
            onChange={() => setIsRememberChecked(!isRememberChecked)} />
          <RadioInput
            label="France"
            id="france"
            value="france" />
          <RangeInput
            label="Ton âge"
            id="age"
            min={18}
            max={100}
            value={value}
            setter={setValue} />
          <DoubleRangeInput
            label="Durée du film"
            id="length"
            min={18}
            max={100}
            minValue={minValue}
            maxValue={maxValue}
            minSetter={setMinValue}
            maxSetter={setMaxValue} />
          <TextInput
            id="firstName"
            label="Votre prénom"
            placeholder="Votre prénom..."
            required={isRequired}
            minLength={3}
            errorMessage="Saisir un prénom d'au moins 3 lettres." />
          <TextArea
            id="message"
            label="Entrez votre message"
            placeholder="Mon message..."
            required={isRequired}
            errorMessage="Votre message doit comporter a minima 15 caractères."
          />
          <Button>Submit</Button>
        </form>}
    </>
  );
};

export default Home;
