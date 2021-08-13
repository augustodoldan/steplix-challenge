create database steplix;
use steplix;

CREATE TABLE currencies (
    id INT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(100),
	symbol VARCHAR(5),
    PRIMARY KEY (id)
);
CREATE TABLE rates (
    id INT NOT NULL AUTO_INCREMENT,
    id_currency INT NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_currency) REFERENCES currencies(id)
);

INSERT INTO currencies (id, `description`, symbol) VALUES (1, 'bitcoin','BTC'), (2, 'etherum','ETH'), (3, 'cardano', 'ADA');

INSERT INTO rates (id, id_currency,`value`, created_at) VALUES (252, 1,'11924.231233', '2020-09-01 16:23:02'), (250, 2,'308.313553', '2020-09-01 16:13:51'), (255, 3,'0.0990881', '2020-09-01 16:23:40');
