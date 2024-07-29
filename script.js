// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('./seat.json')
        .then(response => response.json())
        .then(data => renderSeatMap(data))
        .catch(error => console.error('Error fetching seat data:', error));

    function renderSeatMap(data) {
        const seatMapContainer = document.getElementById('seat-map');
        
        data.sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');
            
            section.rows.forEach(row => {
                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                
                row.seats.forEach(seat => {
                    const seatButton = document.createElement('button');
                    seatButton.classList.add('seat');
                    seatButton.setAttribute('data-seat', `${section.id}-${row.id}-${seat}`);
                    
                    seatButton.addEventListener('click', () => {
                        if (!seatButton.classList.contains('occupied')) {
                            seatButton.classList.toggle('selected');
                            updateSelectedSeats(seatButton);
                        }
                    });

                    rowDiv.appendChild(seatButton);
                });
                
                sectionDiv.appendChild(rowDiv);
            });
            
            seatMapContainer.appendChild(sectionDiv);
        });
    }

    const selectedSeats = [];

    function updateSelectedSeats(seat) {
        const seatNumber = seat.getAttribute('data-seat');
        const index = selectedSeats.indexOf(seatNumber);
        
        if (index > -1) {
            selectedSeats.splice(index, 1);
        } else {
            selectedSeats.push(seatNumber);
        }
        
        console.log('Selected Seats:', selectedSeats);
    }
});
