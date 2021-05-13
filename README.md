ARCADE vol1.0 
1) Otoczenie
	- losowo generowane obiekty poza drogą
		- latające spodki
		- kosmiczny pył
	- tło 
	-barierki utrzymujące gracza w odpowiednim położeniu
	- boczna droga, która spowalnia gracza oraz uniemożliwa mu zdobywanie punktów + blokada przed 
		opuszczeniem drogi
2) Interfejs
	- ruchomy wskaźnik punktów oraz prędkości
	- wyświetlany wynik 
	- tabela najwyższych wyników graczy
	- poziom zdrowia zmieniający się w raz z jego utratą
	- informacje o poziomie gry zależące od zdobytych punktów
	- widoczne uszkodzenia pojazdu w raz z utratą punktów zdrowia
	
3) Rozgrywka
	- prędkość
		- zwiększana w raz ze zdobytymi punktami
		- poruszanie tła oraz obiektów względem prędkości
		- modyfikator oporu powietrza
		- utrudnione hamowanie przy wyższych prędkościach
	- przeszkody w postaci potworów
		- utrata punktów zdrowia w raz z trafieniem
		- hitboxy 
		- aktualizacja potworów w raz z przejechaną drogą
		- modyfikacja prędkości przy uderzeniu
	- punkty w postaci gwiazdek
		- zwiększanie prędkości gracza
		- dodawane punkty ze zdobyciem gwiazdek
		- aktualizacja gwiazdek
		- specjalne rzadkie gwiazki z małą szansą na ich występowanie
		- brak zdobywania punktów poza drogą 
	- specjalne tryby
		-godmode
			- dostępny od 100 puntków
			- zwiększa prędkość gracza - utrudnienie rozgrywki
		-super godmode
			- dostępny od 300 puntków
			- zwiększa prędkość gracza - utrudnienie rozgrywki
		-boss
			- dostępny od 500 puntków
			- zwiększa prędkość gracza - utrudnienie rozgrywki do maksimum 
			- dodanie dodatkowych przeciwników z innymi teksturami
			- zmienienie tła oraz dodanie bossa na końcu trasy 
			
	- database
		- po przegranej możliwość zapisania nowego gracza lubaktualizacja 
			wyników gracza w bazie danych
		- wyświetlanie 5 najwyższych wyników graczy z bazy danych
		- po przegranej możliwość zapisania nowego gracza lub
