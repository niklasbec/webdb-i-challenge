-- Database Queries

-- Find all customers with postal code 1010

SELECT PostalCode
	from customers
    where PostalCode like '%1010';

-- Find the phone number for the supplier with the id 11

SELECT SupplierName
	from Suppliers
    where SupplierID = 11;

-- List first 10 orders placed, sorted descending by the order date

SELECT OrderDate
	from Orders desc
    limit 10;

-- Find all customers that live in London, Madrid, or Brazil

SELECT CustomerName
	from Customers
    where City = 'Madrid' 
    or City = 'London' 
    or Country = 'Brazil';

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

INSERT into Customers(ContactName, Adress, PostalCode, Country )
values('Bilbo Baggins', '1 Hobbit-Hole', '111', 'Middle Earth');

-- Update Bilbo Baggins record so that the postal code changes to "11122"

update Customers
set PostalCode = '11122'
where CustomerId = 92;

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
