import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

type ColumnCreate = {
    name: string,
    type: string,
}

type ColumnInsert = {
    name: string,
    value: string | number | boolean | null,
}


const version = '0'

const dbName = 'siga'

const getDBConnection = async () => {
    return SQLite.openDatabase(dbName, version)
}



const createTable = async (tabName: string, columns: ColumnCreate[]) => {
    try {
        const db = await getDBConnection()
        const query = `CREATE TABLE IF NOT EXISTS ${tabName} (${columns.map((column) => {
            return `${column.name}`
        })
            })`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result
    } catch (e) {
        //Alert.alert(`Error: ${e}`)
        return e
    }


}

const insert = async (tabName: string, columns: ColumnInsert[]) => {
    try {
        const db = await getDBConnection()
        const query = `INSERT INTO ${tabName}(${columns.map((column) => {
            return column.name
        })
            }) VALUES (${columns.map((column) => {
                return `'${column.value}'`
            })
            })`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }

}

const select = async (tabName: string, columns?: string[]) => {
    try {
        const db = await getDBConnection()
        const query = `SELECT 
        ${columns ?
                columns.map((column) => {
                    return column
                })
                :
                ` * `
            }
        FROM ${tabName}`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }
}

const update = async (tabName: string, columns: ColumnInsert[], id: number | string) => {
    try {
        const db = await getDBConnection()
        const query = `UPDATE 
        ${tabName}
        SET
        ${columns.map((column) => {
            return `${column.name} = ${column.value}`
        })}
        WHERE
        id = ${id}`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }
}

const deleteOne = async (tabName: string, id: number) => {
    try {
        const db = await getDBConnection()
        const query = `DELETE FROM ${tabName} WHERE id = ${id}`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }
}

const deleteAll = async (tabName: string) => {
    try {
        const db = await getDBConnection()
        const query = `DELETE FROM ${tabName}`

        const result = await db.execAsync([{
            sql: query, args: []
        }], false
        )

        return result
    } catch (e) {
        Alert.alert(`Error: ${e}`)
        return null
    }
}

export {
    createTable,
    insert,
    select,
    update,
    deleteOne,
    deleteAll
}
