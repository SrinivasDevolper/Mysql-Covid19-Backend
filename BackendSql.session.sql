-- CREATE state table
CREATE TABLE covidbackend.state(
    state_id INTEGER primary key not null auto_increment unique,
    state_name TEXT,
    population INTEGER
)

-- create district table
CREATE TABLE covidbackend.district(
    district_id	INTEGER Not null primary key unique auto_increment,
    district_name TEXT,
    state_id INTEGER,
    cases	INTEGER,
    cured	INTEGER,
    active	INTEGER,
    deaths	INTEGER,
    foreign key(state_id) references state(state_id) on delete cascade
);