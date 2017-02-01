package net.mzouabi.ng2.server.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.mzouabi.ng2.server.dao.PersonDao;
import net.mzouabi.ng2.server.model.Person;
import net.mzouabi.ng2.server.service.PersonDBService;

@Service
public class PersonDBServiceImpl implements PersonDBService{

	@Autowired
	private PersonDao personDao;
	
	
	
	@Override
	public List<Person> findAllPerson() {
		
		return personDao.findAll();
	}

	@Override
	public Person findPersonById(long id) {
		return personDao.findPersonById(id);
	}

	@Override
	public Person save(Person person) {
		return personDao.save(person);
	}

}
