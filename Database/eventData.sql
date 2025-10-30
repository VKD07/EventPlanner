CREATE TABLE
    event (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        title VARCHAR(50) NOT NULL,
        day INT NOT NULL,
        month VARCHAR(15) NOT NULL,
        year INT NOT NULL,
        location VARCHAR(50) NOT NULL,
        description VARCHAR(250)
    );

CREATE TABLE
    members (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        number VARCHAR(20) NOT NULL
    );

CREATE TABLE
    skills (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    roles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    teams (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        event_id UUID NOT NULL REFERENCES event (id) ON DELETE CASCADE,
        name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    team_members (
        team_id UUID NOT NULL,
        member_id UUID NOT NULL,
        PRIMARY KEY (team_id, member_id),
        FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE CASCADE,
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE
    );

CREATE TABLE
    event_flow (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        time TIME NOT NULL,
        segment VARCHAR(100) NOT NULL,
        event_id UUID NOT NULL,
        leader_id UUID NOT NULL,
        FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE,
        FOREIGN KEY (leader_id) REFERENCES members (id) ON DELETE SET NULL
    );

CREATE TABLE
    member_roles (
        member_id UUID REFERENCES members (id) ON DELETE CASCADE,
        role_id UUID REFERENCES roles (id) ON DELETE CASCADE,
        PRIMARY KEY (member_id, role_id)
    );

CREATE TABLE
    member_skills (
        member_id UUID REFERENCES members (id) ON DELETE CASCADE,
        skill_id UUID REFERENCES skills (id) ON DELETE CASCADE,
        PRIMARY KEY (member_id, skill_id)
    );

INSERT INTO
    event (title, day, month, year, location, description)
VALUES
    (
        'Clean up',
        7,
        'September',
        2025,
        'location',
        'cleaning up ceremony'
    );

INSERT INTO
    event_flow (time, segment, event_id, leader_id)
VALUES
    (
        '11:00 AM',
        'Singing',
        '93cc95b4-9f73-4cee-b7bb-47fa35fa1126',
        '72ef88f1-4419-4a88-adeb-9550778609cc'
    );

INSERT INTO
    members (name, email, number)
VALUES
    (
        'Bins',
        'vincekyledelgado@gmail.com',
        '0553279093'
    );