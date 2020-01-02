'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
    // If this getter isn't provided, it will default to 1.
    // Increase this number to increase processing concurrency.
    static get concurrency() {
        return 1
    }

    // This is required. This is a unique key used to identify this job.
    static get key() {
        return 'NewTaskMail-job'
    }

    // This is where the work is done.
    async handle({ email, username, title, file }) {
        console.log(`${NewTaskMail.key}`)

        await Mail.send(
            ['emails.newTask'], { username, title, hasAttachment: !!file },
            message => {
                message
                    .to(email)
                    .from('moderno1940@hotmail.com', 'Alisson | Teste Email')
                    .subject('Nova Tarefa Para Você')

                if (file) {
                    message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
                        filename: file.name
                    })
                }
            }

        )
    }
}

module.exports = NewTaskMail
