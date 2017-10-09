const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;
    let usersArray;

    beforeEach(() => {
        users = new Users();
        usersArray = [
            {
                id: '1',
                name: 'John',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Mike',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Yan',
                room: 'Node Course'
            }
        ];
        users.users = usersArray;
    });

    it('should add user', done => {
        const user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };
        const users = new Users();
        const resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual(expect.arrayContaining([user]));
        done();
    });

    it('should remove user', done => {
        const resUser = users.removeUser('1');
        expect(resUser).toEqual(usersArray[0]);
        expect(users.users).not.toEqual(expect.arrayContaining([usersArray[0]]));
        done();
    });

    it('should not remove user', done => {
        const resUser = users.removeUser('999');
        expect(resUser).toBe(undefined);
        expect(users.users).toEqual(usersArray);
        done();
    });

    it('should return the user', done => {
        const resUser = users.getUser('1');
        expect(resUser).toEqual(usersArray[0]);
        expect(users.users).toEqual(usersArray);
        done();
    });

    it('should not return a user', done => {
        const resUsers = users.getUser('999');
        expect(resUsers).toBe(undefined);
        expect(users.users).toEqual(usersArray);
        done();
    });

    it('should return user list of Node course', done => {
        const namesArray = users.getUserList('Node Course');
        expect(namesArray).toEqual([
            'John',
            'Yan'
        ]);
        done();
    });

    it('should return user list of React course', done => {
        const namesArray = users.getUserList('React Course');
        expect(namesArray).toEqual([
            'Mike'
        ]);
        done();
    })
})