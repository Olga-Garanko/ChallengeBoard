import './styles.scss';

const Radiobox = () => {
	const {
		id,
		labelText,
		name,
		selectedValue,
		options,
		onRadio
	} = props;
	const getRadioItems = () => {
		return options.map(item => (
			<div key={item.value}>
				<input
					id={item.id}
					type="radio"
					className="form-check-input"
					name={name}
					value={item.value}
					defaultChecked={item.value === selectedValue}
					onChange={onRadio}
				/>
				<label htmlFor={item.id} className="form-check-label">{item.labelText}</label>
			</div>
		));
	};
  return (
	<div className="form-group">
	  <div className="form-check" id={id}>
	  <div>{labelText}</div>
	  {getRadioItems()}
	  </div>
	</div>
  );
};

export default Radiobox;