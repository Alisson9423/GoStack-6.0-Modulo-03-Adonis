'use strict'

const Kue = use('Kue')
const Job = use('app/Jobs/NewTaskMail')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async(taskInstance) => {
    if (!taskInstance.user_id && !taskInstance.dirty.user_id) {
        return
    }

    const { email, username } = await taskInstance.user().fetch()

    const file = await taskInstance.file().fetch()

    const { title } = taskInstance

    Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
