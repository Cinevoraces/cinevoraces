BEGIN;

CREATE
OR REPLACE FUNCTION generate_unique_username () RETURNS text AS $$
DECLARE
    syllables text[] := ARRAY[
        'zizi', 'zo', 'zu', 'jaja', 'jeje', 'jiji', 'jojo', 'juju', 'baba', 'bebe', 'bibi', 'bobo', 'bubu', 'dada', 'dede', 'didi', 'dodo', 'dudu', 'fafa', 'fefe',
        'fifi', 'fofo', 'fufu', 'gaga', 'gege', 'gigi', 'gogo', 'gugu', 'haha', 'hehe', 'hihi', 'hoho', 'huhu', 'jaja', 'jeje', 'jiji', 'jojo', 'juju', 'kaka', 'keke',
        'kiki', 'koko', 'kuku', 'lala', 'lele', 'lili', 'lolo', 'lulu', 'mama', 'meme', 'mimi', 'momo', 'mumu', 'nana', 'nene', 'nini', 'nono', 'nunu', 'papa', 'pepe',
        'frog', 'cow', 'pig', 'dog', 'cat', 'rat', 'bat', 'ant', 'bee', 'owl', 'fox', 'foxy', 'hen', 'pig', 'pug', 'emu', 'elk', 'eel', 'fly', 'fox', 'gnu', 'hog', 'jay', 'kid', 'kido',
        'lion', 'lynx', 'mole', 'moth', 'mule', 'newt', 'orca', 'oryx', 'pika', 'pony', 'puma', 'seal', 'slug', 'swan', 'tahr', 'toad', 'tuna', 'wasp', 'wolf', 'worm', 'yak', 'zebu',
        'the', 'elek', 'poke', 'diamond', 'ruby', 'pico', 'pika', 'paradigm', 'paradox', 'paragon', 'parasite', 'ugly', 'beauty', 'beast', 'beastly', 'beastie', 'beasties', 'beastly',
        'walker', 'runner', 'jogger', 'flyer', 'swimmer', 'diver', 'climber', 'hiker', 'biker', 'rider', 'driver', 'sailor', 'pilot', 'captain', 'commander', 'general', 'admiral', 'major',
        'colonel', 'lieutenant', 'sergeant', 'corporal', 'private', 'recruit', 'rookie', 'veteran', 'warrior', 'fighter', 'soldier', 'sailor', 'airman', 'airwoman', 'airperson', 'airforce',
        'pikachu', 'heroe', 'DJ', 'master', 'ninja', 'samurai', 'warrior', 'wizard', 'mage', 'sorcerer', 'sorceress', 'witch', 'witcher', 'warlock', 'priest', 'priestess', 'monk', 'monkess',
        'garry', 'harry', 'larry', 'ben', 'fancy', 'francis', 'jules', 'erika', 'jessica', 'jessie', 'jess', 'mona', 'lisa', 'liza', 'marie', 'jerome', 'lucien', 'gandalf', 'frodo', 'bilbo',
        'mario', 'luigi', 'peach', 'sephiroth', 'cloud', 'elza', 'pierre', 'dominique', 'jean', 'marc', 'luc', 'lucifer', 'satan', 'god', 'jesus', 'yoda', 'obiwan', 'anakin', 'darth', 'vader',
        'timon', 'rafiko', 'jafar', 'nicolas', 'furby'
    ];
  username text;
  separator text;
  number text;
BEGIN
    -- Generate a random separator
    separator := CASE ceil(random()*4)::integer
        WHEN 1 THEN ''  -- PascalCase
        WHEN 2 THEN '_' -- snake_case
        WHEN 3 THEN '-' -- kebab-case
        ELSE ''         -- camelCase
    END;

    -- Generate a random username
    username := string_agg(syllables[ceil(random()*array_length(syllables, 1))::integer], separator) FROM generate_series(1,2);

    -- Randomly start with uppercase
    IF random() < 0.5 THEN
        username := initcap(username);
    END IF;

    -- Randomly add numbers at the end
    IF random() < 0.5 THEN
        number := lpad(floor(random()*10000)::text, 4, '0');
        username := username || number;
    END IF;

    RETURN username;
END;
$$ LANGUAGE plpgsql;

COMMIT;

-- MIGRATION DOWN
BEGIN;

DROP FUNCTION generate_unique_username ();

COMMIT;