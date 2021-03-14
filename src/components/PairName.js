function PairName() {

    const array = [
        "RUB/CUPCAKE",
        'USD/CUPCAKE',
        'EUR/CUPCAKE',
        'RUB/USD',
        'RUB/EUR',
        'EUR/USD'
    ];

  return (
    <div className="pair-name">
        {array.map( item => <div key={item} className = 'value'>{item}</div> )}
    </div>
  );
}

export default PairName;
