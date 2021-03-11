export function Toolbar(props) {
    const {filters, selected, onSelectFilter} = props;
    const SelectFilter = (e) => {
        onSelectFilter(e.target.textContent);
    }

    return(
        <div className='Filters'>
            {filters.map(filt => <button className={selected===filt ? 'Filter selected' : 'Filter'} key = {filt}
            onClick={SelectFilter}>{filt}</button>)}
        </div>
    )
}