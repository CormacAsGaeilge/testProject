package net.mzouabi.ng2.server.mvc;

import net.mzouabi.ng2.server.dao.PersonDao;
import net.mzouabi.ng2.server.service.PersonDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.mzouabi.ng2.server.model.Person;
import net.mzouabi.ng2.server.service.PersonDBService;

public class PersonDBController {
	
	@Autowired
	private PersonDBService personDBService;
	
	
	@RequestMapping(value = "", method = RequestMethod.POST)
    public Person createPerson(@RequestBody Person person) {
		personDBService.save(person);
        return person;
    }
}
