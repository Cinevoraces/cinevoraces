const dateFormater = (stringDate: string) => ( 
  new Date( stringDate.slice(0, 10))
    .toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
);

export default dateFormater;
