function RowName({ title }) {

    const array = [
        "RUB/CUPCAKE",
        'USD/CUPCAKE',
        'EUR/CUPCAKE',
        'RUB/USD',
        'RUB/EUR',
        'EUR/USD'
    ];

  return (
    <div className="column">
    <div className="title">{title}</div>
        {array.map( item => <div key={item} className = 'value'>{item}</div> )}
    </div>
  );
}

export default RowName;
