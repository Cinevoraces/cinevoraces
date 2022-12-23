import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { externalGetRequest, mutationRequestCSR } from '@utils/fetchApi';
import dateFormater from '@utils/dateFormater';
import objectFilter from '@utils/objectFilter';
import tmdbMovieFormater from '@utils/tmdbMovieFormater';
import crewFormater from '@utils/crewFormater';
import { toast } from 'react-hot-toast';
import type { NextPage } from 'next';
import type { FormEvent } from 'react';
import type { Slot, TMDBMovie, TMDBDetailedMovie } from '@custom_types/index';
import type { Episode, MovieBody } from '@custom_types/propositionPage';

import { useAppSelector, useAppDispatch } from '@store/store';
import { user } from 'store/slices/user';

const Proposition: NextPage = () => {
  return (
    <main>
      <p>Proposition wesh</p>
    </main>
  );
};

export default Proposition;
